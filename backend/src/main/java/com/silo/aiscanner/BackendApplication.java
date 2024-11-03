package com.silo.aiscanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@SpringBootApplication
@EnableAsync
public class BackendApplication {

//    @Bean
//    public TaskExecutor taskExecutor() {
//        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
//        executor.setCorePoolSize(5);
//        System.out.println(executor.getCorePoolSize());
//
//        executor.setMaxPoolSize(10);
//        executor.setQueueCapacity(25);
//        return executor;
//    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
