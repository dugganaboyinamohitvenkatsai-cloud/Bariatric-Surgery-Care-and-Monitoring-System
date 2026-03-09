package DSA;

import java.util.*;

// Class representing a patient monitoring record
class PatientRecord {

    String date;
    double weight;
    int bloodPressure;
    int sugar;

    PatientRecord(String date, double weight, int bp, int sugar) {
        this.date = date;
        this.weight = weight;
        this.bloodPressure = bp;
        this.sugar = sugar;
    }

    void display() {
        System.out.println(date + " | Weight: " + weight +
                "kg | BP: " + bloodPressure +
                " | Sugar: " + sugar);
    }
}

public class BariatricDSAProject {

    public static void main(String[] args) {

        System.out.println("Bariatric Surgery Monitoring System - DSA Demo\n");

        // ---------------------------
        // ARRAY LIST (List Concept)
        // ---------------------------
        ArrayList<PatientRecord> records = new ArrayList<>();

        records.add(new PatientRecord("2024-01-01", 120, 140, 180));
        records.add(new PatientRecord("2024-01-08", 115, 135, 165));
        records.add(new PatientRecord("2024-01-15", 110, 130, 150));
        records.add(new PatientRecord("2024-01-22", 108, 128, 140));

        System.out.println("Patient Monitoring Records:");
        for (PatientRecord r : records) {
            r.display();
        }

        // ---------------------------
        // STACK (Weight History)
        // ---------------------------
        Stack<Double> weightHistory = new Stack<>();

        for (PatientRecord r : records) {
            weightHistory.push(r.weight);
        }

        System.out.println("\nWeight History (Latest First using Stack):");

        while (!weightHistory.isEmpty()) {
            System.out.println(weightHistory.pop() + " kg");
        }

        // ---------------------------
        // QUEUE (Patients Waiting)
        // ---------------------------
        Queue<String> patientQueue = new LinkedList<>();

        patientQueue.add("John");
        patientQueue.add("David");
        patientQueue.add("Maria");

        System.out.println("\nPatient Monitoring Queue:");

        while (!patientQueue.isEmpty()) {
            System.out.println("Checking patient: " + patientQueue.poll());
        }

        // ---------------------------
        // SEARCHING (Linear Search)
        // ---------------------------
        double searchWeight = 110;
        boolean found = false;

        for (PatientRecord r : records) {
            if (r.weight == searchWeight) {
                System.out.println("\nRecord Found for weight: " + searchWeight);
                r.display();
                found = true;
                break;
            }
        }

        if (!found) {
            System.out.println("\nWeight record not found.");
        }

        // ---------------------------
        // SORTING (Bubble Sort)
        // ---------------------------
        double[] weights = new double[records.size()];

        for (int i = 0; i < records.size(); i++) {
            weights[i] = records.get(i).weight;
        }

        for (int i = 0; i < weights.length - 1; i++) {
            for (int j = 0; j < weights.length - i - 1; j++) {

                if (weights[j] > weights[j + 1]) {

                    double temp = weights[j];
                    weights[j] = weights[j + 1];
                    weights[j + 1] = temp;
                }
            }
        }

        System.out.println("\nSorted Weight Records (Ascending Order):");

        for (double w : weights) {
            System.out.println(w + " kg");
        }

        System.out.println("\nDSA Concepts Used:");
        System.out.println("1. ArrayList for storing patient records");
        System.out.println("2. Stack for weight history (LIFO)");
        System.out.println("3. Queue for patient monitoring order (FIFO)");
        System.out.println("4. Linear Search for finding a record");
        System.out.println("5. Bubble Sort for sorting weight data");
    }
}