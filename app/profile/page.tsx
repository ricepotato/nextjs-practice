import ProfileForm from "@/components/profile/form";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
        <ProfileForm />
      </div>
    </main>
  );
}
