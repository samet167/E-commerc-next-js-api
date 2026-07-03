"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  FolderPen,
} from "lucide-react";

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://127.0.0.1:8000/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Load Error");
        }

        const data = await res.json();

        setName(data.name ?? "");
      } catch (error) {
        console.error(error);
        alert("មិនអាចទាញយកព័ត៌មានប្រភេទទំនិញបានទេ");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);

      const res = await fetch(
        `http://127.0.0.1:8000/categories/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "មិនអាចកែប្រែបានទេ");
      }

      alert("កែប្រែប្រភេទទំនិញបានជោគជ័យ");

      router.push("/admin/categories");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            កែប្រែប្រភេទទំនិញ
          </h1>

          <p className="text-gray-500 mt-2">
            កែប្រែព័ត៌មានរបស់ប្រភេទទំនិញ
          </p>
        </div>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 border border-gray-300 rounded-xl px-5 py-3 hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          ត្រឡប់ក្រោយ
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

        {/* Card Header */}
        <div className="bg-slate-50 border-b px-6 py-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <FolderPen className="text-blue-600" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              ព័ត៌មានប្រភេទទំនិញ
            </h2>

            <p className="text-sm text-gray-500">
              សូមកែប្រែព័ត៌មានខាងក្រោម
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              ឈ្មោះប្រភេទទំនិញ
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="បញ្ចូលឈ្មោះប្រភេទទំនិញ..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.push("/admin/categories")}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              បោះបង់
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  កំពុងរក្សាទុក...
                </>
              ) : (
                <>
                  <Save size={18} />
                  រក្សាទុកការកែប្រែ
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}