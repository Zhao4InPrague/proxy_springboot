package com.datax.proxy.test;

public class ProducerThread extends Thread {

    private MyStack<Character> myStack;

    public ProducerThread(MyStack<Character> myStack, String name){
        super(name);
        this.myStack = myStack;
    }

    public void run() {
        while (true) {
            char c = randomChar();
            System.out.println(this.getName() + " 压入: " + c);
            myStack.push(c);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public char randomChar() {
        return (char)(Math.random()*('Z'+1-'A') + 'A');
    }

}
