import React, { useState, useEffect } from "react";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
} from "./categoryAPI";
import { toast, Toaster } from "react-hot-toast";

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const LOCAL_STORAGE_EDIT_ID_KEY = "category_edit_id";

const CategoryPage: React.FC = () => {
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesQuery(undefined);

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryByIdMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryByIdMutation();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Load stored edit ID on mount
  useEffect(() => {
    const storedId = localStorage.getItem(LOCAL_STORAGE_EDIT_ID_KEY);
    if (storedId) {
      const idNum = parseInt(storedId, 10);
      if (!isNaN(idNum)) {
        setEditId(idNum);
      }
    }
  }, []);

  useEffect(() => {
    if (editId !== null && categories) {
      const category = categories.find((c: { id: number; }) => c.id === editId);
      if (category) {
        setEditName(category.name);
        setEditDesc(category.description);
      } else {
        setEditId(null);
        setEditName("");
        setEditDesc("");
      }
    } else {
      setEditName("");
      setEditDesc("");
    }
  }, [editId, categories]);

  useEffect(() => {
    if (editId !== null) {
      localStorage.setItem(LOCAL_STORAGE_EDIT_ID_KEY, editId.toString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_EDIT_ID_KEY);
    }
  }, [editId]);

  const handleCreate = async () => {
    if (!newCategoryName.trim() || !newCategoryDesc.trim()) {
      toast.error("Please enter both name and description");
      return;
    }
    try {
      await createCategory({
        name: newCategoryName.trim(),
        description: newCategoryDesc.trim(),
      }).unwrap();
      setNewCategoryName("");
      setNewCategoryDesc("");
      await refetch();
      toast.success("Category created successfully!");
    } catch {
      toast.error("Failed to create category");
    }
  };

  const handleUpdate = async () => {
    if (editId === null) {
      toast.error("No category selected for editing");
      return;
    }
    if (!editName.trim() || !editDesc.trim()) {
      toast.error("Please enter both name and description");
      return;
    }
    try {
      await updateCategory({
        id: editId,
        body: {
          name: editName.trim(),
          description: editDesc.trim(),
        },
      }).unwrap();
      setEditId(null);
      await refetch();
      toast.success("Category updated successfully!");
    } catch {
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async () => {
    if (editId === null) {
      toast.error("No category selected for deletion");
      return;
    }

    try {
      await deleteCategory(editId).unwrap();
      setEditId(null);
      await refetch();
      toast.success("Category deleted successfully!");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Category Management
      </h1>

      {/* Create New Category */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="New category name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={isCreating}
        />
        <input
          type="text"
          placeholder="New category description"
          value={newCategoryDesc}
          onChange={(e) => setNewCategoryDesc(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={isCreating}
        />
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          {isCreating ? "Adding..." : "Add Category"}
        </button>
      </div>

      {/* Edit/Delete Category */}
      {editId !== null && (
        <div className="mb-8 p-4 bg-yellow-50 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-3 text-orange-500">
            Edit Category (ID: {editId})
          </h2>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Category name"
            disabled={isUpdating}
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Category description"
            disabled={isUpdating}
          />
          <div className="flex gap-4">
            <button
              onClick={handleUpdate}
              disabled={isUpdating}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition"
            >
              {isDeleting ? "Deleting..." : "Delete Category"}
            </button>
            <button
              onClick={() => {
                setEditId(null);
                setEditName("");
                setEditDesc("");
              }}
              disabled={isUpdating || isDeleting}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List Categories */}
      <div className="bg-white shadow rounded-md p-4">
        {isLoading ? (
          <p className="text-gray-500">Loading categories...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load categories.</p>
        ) : categories?.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((category: Category) => (
              <li
                key={category.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-2 sm:gap-0 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                onClick={() => setEditId(category.id)}
              >
                <div>
                  <p className="font-semibold text-orange-600">
                    {category.name}
                  </p>
                  <p className="text-gray-600">{category.description}</p>
                </div>
                <div className="text-sm text-gray-400">
                  Created: {new Date(category.created_at).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
