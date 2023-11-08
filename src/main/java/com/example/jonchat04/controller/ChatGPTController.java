package com.example.jonchat04.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatGPTController {

    @GetMapping("/recipe")
    public String getRecipe()
    {
        return "forward:/html/recipe.html";
    }

    @GetMapping("/random")
    public String getRandom()
    {
        return "forward:/html/random.html";
    }

    @GetMapping("/ingredient")
    public String getIngredient()
    {
        return "forward:/html/ingredient.html";
    }


}

