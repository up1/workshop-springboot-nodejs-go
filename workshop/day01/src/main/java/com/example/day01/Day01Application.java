package com.example.day01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Day01Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx
				=  SpringApplication.run(Day01Application.class, args);
		for (String beanDefinitionName : ctx.getBeanDefinitionNames()) {
			System.out.println(beanDefinitionName);
		}
		System.out.println(ctx.getBeanDefinitionCount());
	}

}
