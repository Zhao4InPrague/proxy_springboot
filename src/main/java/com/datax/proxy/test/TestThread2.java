package com.datax.proxy.test;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TestThread2 {

    public static void main(String[] args) {
        MyStack<Character> stack = new MyStack<>();
        new ProducerThread(stack, "producer1").start();
        new ProducerThread(stack, "producer2").start();
        new ConsumerThread(stack, "consumer1").start();
        new ConsumerThread(stack, "consumer2").start();
        new ConsumerThread(stack, "consumer3").start();

    }

}
