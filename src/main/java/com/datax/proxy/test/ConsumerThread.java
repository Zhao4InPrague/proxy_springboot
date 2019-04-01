package com.datax.proxy.test;

public class ConsumerThread extends Thread{

    private MyStack<Character> myStack;

    public ConsumerThread(MyStack<Character> myStack, String name){
        super(name);
        this.myStack = myStack;
    }

    public void run() {
        while (true){
            char c = myStack.pull();
            System.out.println(this.getName()+" 弹出: " + c);
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
