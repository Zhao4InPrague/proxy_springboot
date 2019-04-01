package com.datax.proxy.test;

public class TestThread {

    public static void main(String[] args) {
        ThreadPool pool = new ThreadPool();

        for(int i = 0; i < 5; i++) {
            Runnable task = new Runnable() {
                @Override
                public void run() {
                    //....
                }
            };

            pool.add(task);

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

        }

    }

}
