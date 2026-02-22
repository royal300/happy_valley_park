import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Save, X, ArrowUp, ArrowDown, Plus } from 'lucide-react';

const TicketManager = () => {
    const [tickets, setTickets] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const apiUrl = '/backend/api/tickets.php';

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await axios.get(apiUrl);
            if (Array.isArray(response.data)) {
                setTickets(response.data);
            }
        } catch (error) {
            setMessage('❌ Error loading tickets');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (ticket) => {
        setEditingId(ticket.id);
        setEditForm({
            id: ticket.id,
            name: ticket.name || '',
            description: ticket.description || '',
            price: ticket.price || '',
            original_price: ticket.original_price || '',
            discount: ticket.discount || '',
            color: ticket.color || 'from-blue-500 to-blue-700',
            link: ticket.link || 'https://happyvalley.royal300.com/client/book',
        });
    };

    const handleNewClick = () => {
        setEditingId('new');
        setEditForm({
            name: '',
            description: '',
            price: '',
            original_price: '',
            discount: '',
            color: 'from-blue-500 to-blue-700',
            link: 'https://happyvalley.royal300.com/client/book',
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!editForm.name || !editForm.price) {
            setMessage('❌ Name and price are required');
            return;
        }

        try {
            const response = await axios.post(apiUrl, editForm);
            if (response.data.success) {
                setEditingId(null);
                setEditForm({});
                setMessage('✅ Package saved successfully!');
                fetchTickets();
            } else {
                setMessage('❌ ' + (response.data.error || 'Save failed'));
            }
        } catch (error) {
            const errMsg = error.response?.data?.error || 'Failed to save changes';
            setMessage('❌ ' + errMsg);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this ticket package?')) return;
        try {
            await axios.delete(`${apiUrl}?id=${id}`);
            setMessage('✅ Package deleted');
            fetchTickets();
        } catch (error) {
            setMessage('❌ Failed to delete');
        }
    };

    const handleMove = async (index, direction) => {
        const newTickets = [...tickets];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        if (swapIndex < 0 || swapIndex >= newTickets.length) return;

        [newTickets[index], newTickets[swapIndex]] = [newTickets[swapIndex], newTickets[index]];

        setTickets(newTickets); // Optimistic update

        try {
            const orderIds = newTickets.map(t => t.id);
            await axios.post(apiUrl, { action: 'reorder', order: orderIds });
        } catch (error) {
            setMessage('❌ Failed to update order');
            fetchTickets(); // Revert on fail
        }
    };

    if (loading) return <p className="text-gray-500">Loading tickets...</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Manage Ticket Packages</h2>

            {message && (
                <p className={`font-semibold ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </p>
            )}

            {/* Add / Edit Form Area */}
            {editingId ? (
                <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
                    <h3 className="text-xl font-bold mb-4">{editingId === 'new' ? 'Create New Package' : 'Edit Package'}</h3>
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Package Name *</label>
                            <input type="text" placeholder="e.g. Water World Ticket" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                            <input type="text" placeholder="e.g. FULL WATER ACCESS" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Price *</label>
                            <input type="text" placeholder="e.g. ₹400" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })} className="w-full p-2 border rounded" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Original Price</label>
                            <input type="text" placeholder="e.g. ₹500" value={editForm.original_price} onChange={e => setEditForm({ ...editForm, original_price: e.target.value })} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Discount Text</label>
                            <input type="text" placeholder="e.g. 20% OFF" value={editForm.discount} onChange={e => setEditForm({ ...editForm, discount: e.target.value })} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Booking Link</label>
                            <input type="text" placeholder="https://..." value={editForm.link} onChange={e => setEditForm({ ...editForm, link: e.target.value })} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Card Color Theme</label>
                            <select value={editForm.color} onChange={e => setEditForm({ ...editForm, color: e.target.value })} className="w-full p-2 border rounded">
                                <option value="from-cyan-500 to-blue-600">Cyan/Blue (Water)</option>
                                <option value="from-purple-500 to-pink-600">Purple/Pink (Combo)</option>
                                <option value="from-orange-500 to-red-600">Orange/Red (Dry)</option>
                                <option value="from-blue-500 to-blue-700">Blue (Entry)</option>
                                <option value="from-green-500 to-emerald-600">Green</option>
                                <option value="from-yellow-500 to-orange-600">Gold</option>
                            </select>
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 font-bold border rounded hover:bg-gray-100 flex items-center gap-2">
                                <X size={18} /> Cancel
                            </button>
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 flex items-center gap-2">
                                <Save size={18} /> Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <button onClick={handleNewClick} className="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700 shadow flex items-center gap-2">
                    <Plus size={18} /> Add New Package
                </button>
            )}

            {/* List */}
            <div className="space-y-3">
                {tickets.map((ticket, index) => (
                    <div key={ticket.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <button disabled={index === 0} onClick={() => handleMove(index, 'up')} className="text-gray-400 hover:text-blue-600 disabled:opacity-30"><ArrowUp size={20} /></button>
                                <button disabled={index === tickets.length - 1} onClick={() => handleMove(index, 'down')} className="text-gray-400 hover:text-blue-600 disabled:opacity-30"><ArrowDown size={20} /></button>
                            </div>
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${ticket.color}`}></div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">{ticket.name}</h4>
                                <p className="text-sm text-gray-500">
                                    {ticket.description} • <span className="font-semibold text-green-600">{ticket.price}</span>
                                    {ticket.original_price && <span className="ml-2 line-through text-gray-400">{ticket.original_price}</span>}
                                    {ticket.discount && <span className="ml-2 text-red-500 font-bold">{ticket.discount}</span>}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEditClick(ticket)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Edit"><Pencil size={20} /></button>
                            <button onClick={() => handleDelete(ticket.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Delete"><Trash2 size={20} /></button>
                        </div>
                    </div>
                ))}
            </div>
            {tickets.length === 0 && <p className="text-gray-500 italic">No ticket packages found.</p>}
        </div>
    );
};

export default TicketManager;
