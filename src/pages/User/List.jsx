import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import { Label } from "@/components/ui/label";

const dataUsers = [
    {
        id: 1,
        name: "Aira",
        email: "airaasastrii@gmail.com",
        password: 12345678
    },
    {
        id: 2,
        name: "Budi",
        email: "budii23@gmail.com",
        password: 12345678
    },
    {
        id: 3,
        name: "Ani",
        email: "anii45@gmail.com",
        password: 12345678
    },

]
const ListUser = () => {
    const _initForm = {
        id: null,
        name: "",
        email: "",
        password: "",
        status: 'Active'
    };

    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState(dataUsers);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
        setFormData(_initForm);
        setIsEdit(false);
    };

    const handleEditModal = (user) => {
        setShowModal(true);
        setIsEdit(true);
        setFormData(user);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // jika mau edit data 
        if (isEdit) {
            setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
        } else {
            const newUser = {
                ...formData,
                id: Date.now(),
            };

            setUsers([...users, newUser]);
            setFormData(_initForm);
        }
        setShowModal(false);

    };

    const handleDelete = (id) => {
        const confirmation = window.confirm("Are you sure want to delete this data?");
        if (confirmation) {
            setUsers(users.filter((u) => u.id !== id));
        }
    // filter : users
    };

    return (
        <>
            <Card className="shadow-sm border border-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-xl font-bold">Data User</CardTitle>
                    </div>
                    <Button className="bg-pink-700" onClick={handleOpenModal}>Create New User</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h4 className="mb-0 fw-bold">Data User</h4>
                        </div>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">#</th>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Email</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>Active</td>
                                        <td className="px-4 py-6 text-right whitespace-nowrap">
                                            <Button onClick={() => handleEditModal(user)} variant="warning" size="sm" className="me-2">Edit</Button>
                                            <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm" className="me-2">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted">
                                        Belum ada data user
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>



            <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New User"}
                onSubmit={handleSubmit} submitLabel={isEdit ? 'Save Change' : 'Save'}
            >
                {/* cara pertama */}
                 {/* <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input id="name" name="name"value={formData.name} onChange={handleChange} required placeholder="Enter your name"></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>email</Label>
                        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email></Input>
                    </div>
                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password"/>
                    </div>
                </div> */}


                {/* cara kedua */}
                <div className="mb-3">
                    <Label>Name</Label>
                    <Input type="text" name="name"
                        placeholder="Enter your name" required
                        value={formData.name} onChange={handleChange}></Input>
                </div>
                <div className="mb-3">
                    <Label>Email</Label>
                    <Input type="email" name="email"
                        placeholder="Enter your email" required
                        value={formData.email} onChange={handleChange}></Input>
                </div>
                <div className="mb-3">
                    <Label>Password</Label>
                    <Input type="password" name="password"
                        placeholder="Enter your password" required
                        value={formData.password} onChange={handleChange}></Input>
                </div>

                <div className="mb-3">
                    <label>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="">Select One</option>
                        <option value="Active">Publish</option>
                        <option value="In Active">Draft</option>
                    </select>
                </div>
            </AppModal>

           

        </>
    );
};

export default ListUser;