"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";
import {auth, db} from '../../../firebase/client';

/**
 * SuccessPage component handles post-payment logic
 * It:
 * 1. Extracts the session_id from the URL
 * 2. Fetches session details from an API route.
 * 3. Credits SimCoins to the authenticated user's Firestore document.
 * 4. Displays a success or error message. 
 * @returns 
 */
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Processing your payment...");

  useEffect(() => {
    const fetchAndCreditSimcoins = async () => {
      if (!sessionId) {
        setMessage("❌ No session ID found.");
        return;
      }

      try {
        //Fetch session details from API route: retreive-checkout session
        const res = await fetch(`/api/retrieve-checkout-session?session_id=${sessionId}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error);
        const { simcoins } = data;

        // Wait for Firebase Auth to confirm the user
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!user) {
            setMessage("❌ You must be signed in to receive SimCoins.");
            return;
          }

          // Update user's balance in Firestore
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            coinCount: increment(simcoins),
          });

          setMessage(`✅ Thank you! ${simcoins} SimCoins have been added to your account.`);
        });

        return () => unsubscribe(); // cleanup listener
      } catch (err) {
        console.error("Error updating SimCoins:", err);
        setMessage("❌ Something went wrong. Please contact support.");
      }
    };

    fetchAndCreditSimcoins();
  }, [sessionId]);


  return (
    <main className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Success</h1>
      <p className="text-lg">{message}</p>
    </main>
  );
}