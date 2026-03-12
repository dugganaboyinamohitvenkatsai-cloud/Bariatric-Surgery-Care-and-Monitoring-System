package DSA;

import java.util.*;


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
    

    public static void main(String[] args) {

        System.out.println("\n╔══════════════════════════════════════════════════════════╗");
        System.out.println("║   Bariatric Surgery Monitoring System — DSA Demo        ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");

    
        
        

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
        // 4. PRIORITY QUEUE — Patient Severity (High BP)
        // ------------------------------------------


        PriorityQueue<PatientRecord> priorityQueue = new PriorityQueue<>(
                (p1, p2) -> Integer.compare(p2.bloodPressure, p1.bloodPressure)
        );

        priorityQueue.add(new PatientRecord("John", "2024-01-22", 108.2, 128, 140));
        priorityQueue.add(new PatientRecord("David", "2024-01-01", 135.0, 145, 190));
        priorityQueue.add(new PatientRecord("Maria", "2024-01-01", 98.0, 120, 110));

        System.out.println("\n  Processing patients based on Blood Pressure priority:\n");

        int pqIndex = 1;
        while (!priorityQueue.isEmpty()) {
            PatientRecord p = priorityQueue.poll();
            System.out.printf("    %d. %-8s | BP: %3d%n", pqIndex++, p.name, p.bloodPressure);
        }

        // ------------------------------------------
        // 5. HASHMAP — Patient Lookup by Name O(1)
        // ------------------------------------------


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
        // 6. LINEAR SEARCH — Find a Weight Record
        // ------------------------------------------


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


        System.out.println();
        System.out.println("   1. ArrayList     — Storing sequential patient records");
        System.out.println("   2. Stack         — Viewing weight history in LIFO order");
        System.out.println("   3. Queue         — Managing patient monitoring queue (FIFO)");
        System.out.println("   4. PriorityQueue — Sorting patients by severity (High BP)");
        System.out.println("   5. HashMap       — O(1) patient lookup by name");
        System.out.println("   6. Linear Search — Find a specific weight record");
        System.out.println("   7. Bubble Sort   — Sort weight data in ascending order");
        System.out.println();
    }
}
