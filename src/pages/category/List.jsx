import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/AppModal";
import { Label } from "@/components/ui/label";
import api from "@/services/api.js";

const CategoryPage = () => {
    const _initForm = {
        id: null,
        name: "",
        email: "",
        password: "",
        is_active: 1,
    };

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(_initForm);
    const [isEdit, setIsEdit] = useState(false);
    const fetchCategories = async () => {
        try {
            const response = await api.get("/category");
            setCategories(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        // console.log("render ini");
        fetchCategories()
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                is_active: parseInt(formData.is_active),
            };
            if (isEdit) {
                // update data =
                await api.put(`/category/${formData.id}`, payload);
                // setTransactions(transactions.map((user) => (user.id === formData.id ? formData : user)));
            } else {
                // update data
                await api.post("/category", payload);
                // const newUser = {
                    //     ...formData,
                    //     id: Date.now(),
                    // };
                    // setTransactions([...transactions, newUser]);
                } 
                setFormData(_initForm);
            } catch (error) {
                const errMsg = error.message;
                console.log(errMsg);
            } finally {
                await fetchCategories();
                setShowModal(false);
            }
            // jika mau edit data 
    };

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure want to delete this data?");
        if (confirmation) {
            // delete
            await api.delete(`/category/${id}`)
            fetchCategories();
            // setTransactions(transactions.filter((u) => u.id !== id));
        }
    // filter : transactions
    };

    return (
        <>
            <Card className="shadow-sm border border-6 p-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle className="text-xl font-bold">Data Category</CardTitle>
                    </div>
                    <Button className="bg-pink-800" onClick={handleOpenModal}>Create New Category</Button>
                </CardHeader>
                <CardContent className="p-0">
                
                    <table className="w-full text-left text-sm">
                        <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3 font-medium">#</th>
                                <th className="text-right pr-10 px-6 py-3 font-medium">Name</th>
                                <th className="text-right pr-10 px-3 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <tr key={index} className="hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                                        <td className="px-8 py-6 text-right whitespace-nowrap">{category.name}</td>
                                        <td className="px-4 py-6 text-right whitespace-nowrap">
                                            <Button onClick={() => handleEditModal(user)} size="sm" className="me-2 rounded-md bg-pink-800 text-white">Edit</Button>
                                            <Button onClick={() => handleDelete(user.id)} variant="destructive" size="sm" className="me-2 rounded-md  bg-pink-500 text-white">Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-muted">
                                        Belum ada Data Transaction
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>



            <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New Category"}
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
                <div className="space-y-2">
                    <Label>Name</Label>
                    <Input type="text" name="name"
                        placeholder="Enter your name" required
                        value={formData.name} onChange={handleChange}></Input>
                </div>
                {/* <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" name="email"
                        placeholder="Enter your email" required
                        value={formData.email} onChange={handleChange}></Input>
                </div>
                <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" name="password"
                        placeholder="Enter your password" required={isEdit ? false : true}
                        value={formData.password} onChange={handleChange}></Input>
                </div>
                {isEdit ? (
                    <div className="space-y-2">
                        <Label>Activation</Label>
                    </div>
                ) : (
                    ""
                )} */}
                <div className="space-y-2">
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

export default CategoryPage;