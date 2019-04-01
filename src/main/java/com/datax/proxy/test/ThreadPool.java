package com.datax.proxy.test;

import java.util.LinkedList;

public class ThreadPool {

    // 线程池大小
    int threadPoolSize;

    // 任务容器
    LinkedList<Runnable> tasks = new LinkedList<>();

    // 试图消费任务的线程
    public ThreadPool(){
        synchronized (tasks)
        {
            threadPoolSize = 10;
            for(int i = 0; i < threadPoolSize; i++) {
                new TaskConsumeThread("消费任务的线程" + i).start();
            }
        }

    }

    //add
    public void add(Runnable t){
        synchronized (tasks){
            tasks.add(t);
            tasks.notifyAll();
        }
    }

    //TaskConsumeThread
    class TaskConsumeThread extends Thread{

        Runnable task;

        public TaskConsumeThread(String name){
            super(name);
        }

        public void run() {
            System.out.println("启动： " + this.getName());
            while (true) {
                synchronized (tasks) {
                    while (tasks.isEmpty()) {
                        try {
                            tasks.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    task = tasks.removeLast();
                    tasks.notifyAll();
                }
                System.out.println(this.getName() + " 获取到任务，并执行");
                task.run();
            }
        }

    }

}


