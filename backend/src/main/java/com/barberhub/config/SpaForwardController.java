package com.barberhub.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping(value = "/{path:^(?!api$)[^\\.]*$}")
    public String forward() {
        return "forward:/index.html";
    }
}
