package DSA;

import java.util.*;

/**
 * Bariatric Surgery Monitoring System - DSA Demonstration
 * 
 * This program demonstrates how core Data Structures and Algorithms
 * can be applied to a real-world healthcare monitoring scenario.
 * 
 * DSA Concepts Demonstrated:
 *  1. ArrayList  — Sequential storage of patient monitoring records
 *  2. Stack      — LIFO access to weight history (most recent first)
 *  3. Queue      — FIFO patient monitoring order
 *  4. HashMap    — O(1) patient lookup by name
 *  5. Linear Search — Finding a specific weight record
 *  6. Bubble Sort   — Sorting weight data in ascending order
 * 
 * @author Mohit Venkat Sai Dugganaboyina
 */

// Class representing a single patient monitoring record
class PatientRecord {

    String name;
    String date;
    double weight;
    int bloodPressure;
    int sugar;

    PatientRecord(String name, String date, double weight, int bp, int sugar) {
        this.name = name;
        this.date = date;
        this.weight = weight;
        this.bloodPressure = bp;
        this.sugar = sugar;
    }

    void display() {
        System.out.printf("  %-10s | %-12s | Weight: %6.1fkg | BP: %3d | Sugar: %3d%n",
                name, date, weight, bloodPressure, sugar);
    }
}

public class BariatricDSAProject {

    // Utility method to print section dividers
    static void printDivider(String title) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  " + title);
        System.out.println("=".repeat(60));
    }

    public static void main(String[] args) {

        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║   Bariatric Surgery Monitoring System — DSA Demo        ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");

        // ------------------------------------------
        // 1. ARRAYLIST — Sequential Record Storage
        // ------------------------------------------
        printDivider("1. ARRAYLIST — Patient Monitoring Records");

        ArrayList<PatientRecord> records = new ArrayList<>();

        records.add(new PatientRecord("John", "2024-01-01", 120.0, 140, 180));
        records.add(new PatientRecord("John", "2024-01-08", 115.5, 135, 165));
        records.add(new PatientRecord("John", "2024-01-15", 110.0, 130, 150));
        records.add(new PatientRecord("John", "2024-01-22", 108.2, 128, 140));
        records.add(new PatientRecord("David", "2024-01-01", 135.0, 145, 190));
        records.add(new PatientRecord("Maria", "2024-01-01", 98.0, 120, 110));

        System.out.println("\n  All stored records (" + records.size() + " entries):\n");
        for (PatientRecord r : records) {
            r.display();
        }

        // ------------------------------------------
        // 2. STACK — Weight History (LIFO)
        // ------------------------------------------
        printDivider("2. STACK — Weight History (Latest First)");

        Stack<Double> weightHistory = new Stack<>();

        // Push only John's records to the stack
        for (PatientRecord r : records) {
            if (r.name.equals("John")) {
                weightHistory.push(r.weight);
            }
        }

        System.out.println("\n  John's weight readings (popped from Stack — LIFO):\n");

        int stackIndex = 1;
        while (!weightHistory.isEmpty()) {
            System.out.println("    " + stackIndex + ". " + weightHistory.pop() + " kg");
            stackIndex++;
        }

        // ------------------------------------------
        // 3. QUEUE — Patient Monitoring Order (FIFO)
        // ------------------------------------------
        printDivider("3. QUEUE — Patient Monitoring Order (FIFO)");

        Queue<String> patientQueue = new LinkedList<>();

        patientQueue.add("John");
        patientQueue.add("David");
        patientQueue.add("Maria");

        System.out.println("\n  Processing patients in order:\n");

        int queueIndex = 1;
        while (!patientQueue.isEmpty()) {
            System.out.println("    " + queueIndex + ". Now checking: " + patientQueue.poll());
            queueIndex++;
        }

        // ------------------------------------------
        // 4. HASHMAP — Patient Lookup by Name O(1)
        // ------------------------------------------
        printDivider("4. HASHMAP — Patient Lookup by Name");

        HashMap<String, PatientRecord> patientMap = new HashMap<>();

        // Store the latest record for each patient
        for (PatientRecord r : records) {
            patientMap.put(r.name, r);
        }

        System.out.println("\n  Registered patients: " + patientMap.keySet());
        System.out.println("\n  Looking up 'David':\n");

        PatientRecord found = patientMap.get("David");
        if (found != null) {
            found.display();
        }

        System.out.println("\n  Looking up 'Alice' (not registered):");
        PatientRecord notFound = patientMap.get("Alice");
        System.out.println("    Result: " + (notFound == null ? "Patient not found" : notFound.name));

        // ------------------------------------------
        // 5. LINEAR SEARCH — Find a Weight Record
        // ------------------------------------------
        printDivider("5. LINEAR SEARCH — Find Record by Weight");

        double searchWeight = 110.0;
        boolean searchFound = false;

        System.out.println("\n  Searching for weight = " + searchWeight + " kg...\n");

        for (PatientRecord r : records) {
            if (r.weight == searchWeight) {
                System.out.println("  ✅ Match found:");
                r.display();
                searchFound = true;
                break;
            }
        }

        if (!searchFound) {
            System.out.println("  ❌ No record found with weight " + searchWeight + " kg.");
        }

        // ------------------------------------------
        // 6. BUBBLE SORT — Sort Weights Ascending
        // ------------------------------------------
        printDivider("6. BUBBLE SORT — Sorted Weight Records");

        double[] weights = new double[records.size()];

        for (int i = 0; i < records.size(); i++) {
            weights[i] = records.get(i).weight;
        }

        System.out.println("\n  Before sorting: " + Arrays.toString(weights));

        // Bubble Sort algorithm
        for (int i = 0; i < weights.length - 1; i++) {
            for (int j = 0; j < weights.length - i - 1; j++) {
                if (weights[j] > weights[j + 1]) {
                    double temp = weights[j];
                    weights[j] = weights[j + 1];
                    weights[j + 1] = temp;
                }
            }
        }

        System.out.println("  After sorting:  " + Arrays.toString(weights));

        // ------------------------------------------
        // Summary
        // ------------------------------------------
        printDivider("SUMMARY — DSA Concepts Demonstrated");

        System.out.println();
        System.out.println("  ✅ 1. ArrayList   — Storing sequential patient records");
        System.out.println("  ✅ 2. Stack       — Viewing weight history in LIFO order");
        System.out.println("  ✅ 3. Queue       — Managing patient monitoring queue (FIFO)");
        System.out.println("  ✅ 4. HashMap     — O(1) patient lookup by name");
        System.out.println("  ✅ 5. Linear Search — Find a specific weight record");
        System.out.println("  ✅ 6. Bubble Sort — Sort weight data in ascending order");
        System.out.println();
    }
}