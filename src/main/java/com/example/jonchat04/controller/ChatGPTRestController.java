package com.example.jonchat04.controller;

import com.example.jonchat04.dto.ChatRequest;
import com.example.jonchat04.dto.ChatResponse;
import com.example.jonchat04.dto.Choice;
import com.example.jonchat04.dto.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;


@RestController
class ChatGPTRestController
{
    private final WebClient webClient;

   @Value("${OPENAI_API_KEY}")
    private String apiKey;

    public ChatGPTRestController(WebClient.Builder webClientBuilder)
    {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1/chat/completions").build();
    }

    @GetMapping("/chat")
    public List<Choice> chatWithGPT(@RequestParam String message)
    {
        ChatRequest chatRequest = new ChatRequest(); //ChatRequest objekt har jeg dannet med https://www.jsonschema2pojo.org/ værktøj
        chatRequest.setModel("gpt-3.5-turbo"); //vælg rigtig model. se powerpoint
        List<Message> lstMessages = new ArrayList<>(); //en liste af messages med roller
        lstMessages.add(new Message("system", "You are a helpful assistant."));
        lstMessages.add(new Message("user", message));
        chatRequest.setMessages(lstMessages);
        chatRequest.setN(1); //n er antal svar fra chatgpt
        chatRequest.setTemperature(1); //jo højere jo mere fantasifuldt svar (se powerpoint)
        chatRequest.setMaxTokens(1000); //længde af svar
        chatRequest.setStream(false); //stream = true, er for viderekomne, der kommer flere svar asynkront
        chatRequest.setPresencePenalty(1); //noget med ikke at gentage sig. se powerpoint

        ChatResponse response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(apiKey))
                .bodyValue(chatRequest)
                .retrieve()
                .bodyToMono(ChatResponse.class)
                .block();

        final double costPerToken = 0.000002;
        int totalTokenUsed = response.getUsage().getTotalTokens();
        double cost = totalTokenUsed * costPerToken;
        System.out.println("Cost for the interaction: '" + message + "' is: $" + String.format("%.4f", cost) + " USD" + " | " + String.format("%.4f", cost*7) + " DKK | " + "Total Tokens Used: " + totalTokenUsed);

        List<Choice> lst = response.getChoices();

        return lst;
    }
}
