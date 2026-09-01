package com.barberhub.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class AgendamentoTest {

    @Test
    void devePermitirAgendamentoSemDadosPessoaisDoCliente() {
        Agendamento agendamento = new Agendamento();
        agendamento.setCliCodigo(null);
        agendamento.setAgdIdentificacao("Maria");

        assertNull(agendamento.getCliCodigo());
        assertEquals("Maria", agendamento.getAgdIdentificacao());
    }
}
