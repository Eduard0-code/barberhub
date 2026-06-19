package com.barberhub.controller;

import com.barberhub.entity.Material;
import com.barberhub.entity.MovimentacaoEstoque;
import com.barberhub.repository.MaterialRepository;
import com.barberhub.repository.MovimentacaoEstoqueRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/materiais")
public class MaterialController {

    private final MaterialRepository repo;
    private final MovimentacaoEstoqueRepository movRepo;

    public MaterialController(MaterialRepository repo, MovimentacaoEstoqueRepository movRepo) {
        this.repo = repo;
        this.movRepo = movRepo;
    }

    @GetMapping
    public List<Material> listar() {
        return repo.findAllByOrderByMatNomeAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> buscar(@PathVariable Integer id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/movimentacoes")
    public List<MovimentacaoEstoque> movimentacoes() {
        return movRepo.findTop20ByOrderByMovDataDesc();
    }

    @PostMapping
    public ResponseEntity<Material> criar(@RequestBody Material material) {
        if (material.getMatQuantidade() == null) material.setMatQuantidade(BigDecimal.ZERO);
        if (material.getMatQuantidadeMinima() == null) material.setMatQuantidadeMinima(BigDecimal.ZERO);
        return ResponseEntity.ok(repo.save(material));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> atualizar(@PathVariable Integer id, @RequestBody Material dados) {
        Optional<Material> existente = repo.findById(id);
        if (existente.isEmpty()) return ResponseEntity.notFound().build();

        Material atual = existente.get();
        if (dados.getMatNome() != null) atual.setMatNome(dados.getMatNome());
        if (dados.getMatReferencia() != null) atual.setMatReferencia(dados.getMatReferencia());
        if (dados.getMatCategoria() != null) atual.setMatCategoria(dados.getMatCategoria());
        if (dados.getMatUnidade() != null) atual.setMatUnidade(dados.getMatUnidade());
        if (dados.getMatQuantidade() != null) atual.setMatQuantidade(dados.getMatQuantidade());
        if (dados.getMatQuantidadeMinima() != null) atual.setMatQuantidadeMinima(dados.getMatQuantidadeMinima());
        return ResponseEntity.ok(repo.save(atual));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> remover(@PathVariable Integer id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        movRepo.deleteAll(movRepo.findByMatCodigoOrderByMovDataDesc(id));
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /** Baixa de material (uso no dia a dia): decrementa a quantidade e registra a movimentacao. */
    @PostMapping("/{id}/baixa")
    @Transactional
    public ResponseEntity<?> registrarBaixa(@PathVariable Integer id, @RequestBody Map<String, Object> dados) {
        Optional<Material> existente = repo.findById(id);
        if (existente.isEmpty()) return ResponseEntity.notFound().build();

        BigDecimal qtd = lerDecimal(dados.get("quantidade"));
        if (qtd == null || qtd.signum() <= 0) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Informe uma quantidade valida"));
        }

        Material material = existente.get();
        BigDecimal atual = material.getMatQuantidade() != null ? material.getMatQuantidade() : BigDecimal.ZERO;
        if (qtd.compareTo(atual) > 0) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Quantidade maior que o estoque disponivel"));
        }

        material.setMatQuantidade(atual.subtract(qtd));
        repo.save(material);

        MovimentacaoEstoque mov = new MovimentacaoEstoque();
        mov.setMatCodigo(id);
        mov.setMovTipo("Uso");
        mov.setMovQuantidade(qtd);
        mov.setMovObservacao(lerTexto(dados.get("observacao")));
        mov.setMovData(LocalDateTime.now());
        movRepo.save(mov);

        return ResponseEntity.ok(material);
    }

    /** Reposicao de estoque (entrada): incrementa a quantidade e registra a movimentacao. */
    @PostMapping("/{id}/reposicao")
    @Transactional
    public ResponseEntity<?> registrarReposicao(@PathVariable Integer id, @RequestBody Map<String, Object> dados) {
        Optional<Material> existente = repo.findById(id);
        if (existente.isEmpty()) return ResponseEntity.notFound().build();

        BigDecimal qtd = lerDecimal(dados.get("quantidade"));
        if (qtd == null || qtd.signum() <= 0) {
            return ResponseEntity.badRequest().body(Map.of("erro", "Informe uma quantidade valida"));
        }

        Material material = existente.get();
        BigDecimal atual = material.getMatQuantidade() != null ? material.getMatQuantidade() : BigDecimal.ZERO;
        material.setMatQuantidade(atual.add(qtd));
        repo.save(material);

        MovimentacaoEstoque mov = new MovimentacaoEstoque();
        mov.setMatCodigo(id);
        mov.setMovTipo("Reposicao");
        mov.setMovQuantidade(qtd);
        mov.setMovCusto(lerDecimal(dados.get("custo")));
        mov.setMovFornecedor(lerTexto(dados.get("fornecedor")));
        mov.setMovData(LocalDateTime.now());
        movRepo.save(mov);

        return ResponseEntity.ok(material);
    }

    private BigDecimal lerDecimal(Object valor) {
        if (valor == null) return null;
        try {
            String s = String.valueOf(valor).trim().replace(",", ".");
            if (s.isEmpty()) return null;
            return new BigDecimal(s);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private String lerTexto(Object valor) {
        if (valor == null) return null;
        String s = String.valueOf(valor).trim();
        return s.isEmpty() ? null : s;
    }
}
