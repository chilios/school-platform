import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, Pin } from 'lucide-react';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  targetRole: string;
  priority: 'low' | 'medium' | 'high';
  expiryDate?: Date;
  isActive: boolean;
  createdAt: Date;
}

export const AnnouncementBoard: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetRole: 'all',
    priority: 'medium',
    expiryDate: '',
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/announcements`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setAnnouncements(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/announcements`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setFormData({
        title: '',
        content: '',
        targetRole: 'all',
        priority: 'medium',
        expiryDate: '',
      });
      setShowForm(false);
      fetchAnnouncements();
    } catch (error) {
      console.error('Failed to create announcement');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/announcements/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        fetchAnnouncements();
      } catch (error) {
        console.error('Failed to delete announcement');
      }
    }
  };

  const filteredAnnouncements = announcements.filter((ann) =>
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="p-8">Loading announcements...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Announcement Board</h1>
        <p className="text-gray-600">Manage and post school announcements</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Announcement
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Announcement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input-field h-24"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Target Role</label>
                <select
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="input-field"
                >
                  <option value="all">All</option>
                  <option value="admin">Admin Only</option>
                  <option value="teacher">Teachers</option>
                  <option value="student">Students</option>
                  <option value="parent">Parents</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="input-field"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Post Announcement
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((ann) => (
            <div
              key={ann._id}
              className={`card border-l-4 ${getPriorityColor(ann.priority)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  {ann.priority === 'high' && <Pin className="text-red-600" size={20} />}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{ann.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(ann.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ann.priority)}`}>
                    {ann.priority.charAt(0).toUpperCase() + ann.priority.slice(1)}
                  </span>
                  <button
                    onClick={() => handleDelete(ann._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-3">{ann.content}</p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Target: {ann.targetRole}</span>
                {ann.expiryDate && (
                  <span>Expires: {new Date(ann.expiryDate).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card text-center">
            <p className="text-gray-500">No announcements found</p>
          </div>
        )}
      </div>
    </div>
  );
};
