import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ContactEditor = () => {
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        twitter: '',
        facebook: '',
        instagram: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:8080/configuration/contact/main', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData),
            });

            if (response.ok) {
                alert('Contact information updated successfully');
            } else {
                console.error('Error updating contact information:', await response.text());
            }
        } catch (error) {
            console.error('Error updating contact information:', error);
        }
    };

    return (
        <div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="Enter Twitter handle" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} placeholder="Enter Facebook username" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Enter Instagram username" />
            </div>
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default ContactEditor;