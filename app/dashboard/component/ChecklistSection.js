"use client";

export default function ChecklistSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900/90">
      <div className="flex flex-col items-center justify-center h-screen bg-gray-400 text-black">
        <h2 className="text-3xl font-semibold">✔️ Checklist</h2>
        <ul className="mt-4 list-disc">
          <li>💧 Water Bottle</li>
          <li>🧼 Towel</li>
          <li>🎧 Music</li>
        </ul>
      </div>
    </section>
  );
}
