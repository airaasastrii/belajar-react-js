import { useState } from "react";
// import { Card, Form, Button, Table, Modal } from "react-bootstrap";
import AppModal from "../../components/AppModal";

const dataUsers = [
    {
        id: 1,
        name: "ButterScoth",
        description: "Minuman",
        status: "aktif",
        price: 35000,
    },
     {
        id: 2,
        name: "Matcha Latte",
        description: "Minuman",
        status: "aktif",
        price: 30000,
    },
     {
        id: 3,
        name: "Brownies",
        description: "Appitizer",
        status: "aktif",
        price: 25000,
    },
     {
        id: 4,
        name: "Pasta Carbonara",
        description: "Main Course",
        status: "aktif",
        price: 55000,
    },
     {
        id: 5,
        name: "Iga Bakar",
        description: "Main Course",
        status: "aktif",
        price: 45000,
    },

]
const CategoryPage = () => {
    const _initForm = {
        id: null,
        name: "",
        status: 'Tersedia'
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
        if(isEdit) {
            setUsers(users.map((user) => (user.id === formData.id ? formData: user)));
        }else{
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
        const confirmation = window.confirm("Are you sure want to delete this menu?");
        if (confirmation) {
            setUsers(users.filter((u) => u.id !== id));     
        }
        // filter : users
    };

    return (
    <>
        {/* <Card className="shadow-sm border-0">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0 fw-bold">Cofe Shop</h4>
                    </div>
                    <Button variant="primary" onClick={handleOpenModal}>All Menu</Button>
                </div>
                <Table responsive hover className="align-middle mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.description}</td>
                            <td>Active</td>
                            <td>{user.price}</td>
                            <td>
                                {}
                                <Button onClick={() => handleEditModal(user)} variant="warning" size="sm" className="me-2">Edit</Button>
                                <Button onClick={() => handleDelete(user.id)} variant="danger" size="sm" className="me-2">Delete</Button>
                            </td>
                        </tr>
                       ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Create New User"} 
    onSubmit={handleSubmit} submitLabel={isEdit? 'Save Change' : 'Save'}
    >
         <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Drink</Form.Label>
                    <Form.Control type="text" name="name"
                    placeholder="Choose your drink" required
                    value={formData.drink} onChange={handleChange}></Form.Control>
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Main Course</Form.Label>
                    <Form.Control type="text" name="food"
                    placeholder="Enter your food" required
                    value={formData.food} onChange={handleChange}></Form.Control>
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Appitizer</Form.Label>
                    <Form.Control type="text" name="food"
                    placeholder="Enter your snack" required
                    value={formData.food} onChange={handleChange}></Form.Control>
                </Form.Group>
            </Form>

    </AppModal> */}
    </>
    );
};

export default CategoryPage;