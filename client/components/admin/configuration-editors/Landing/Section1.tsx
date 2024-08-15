import {useEffect, useState} from 'react';
import {Label} from "../../../ui/label";
import {Input} from "../../../ui/input";
import {Button} from "../../../ui/button";
import {Textarea} from "../../../ui/textarea";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../ui/card";

const EditSection1Config = () => {
    const [formData, setFormData] = useState({
        description: '',
        buttonText: '',
        link: '',
        heading: '',
        image: null,
    });

    useEffect(() => {
        // Fetch the current configuration data
        fetch('http://localhost:8080/configuration/homepage/section1')
            .then(response => response.json())
            .then(data => {
                setFormData({
                    description: data.description,
                    buttonText: data.buttonText,
                    link: data.link,
                    heading: data.heading,
                    image: null, // Image will be handled separately
                });
            })
            .catch(error => {
                console.error('Error fetching configuration data:', error);
            });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('description', formData.description);
        data.append('buttonText', formData.buttonText);
        data.append('link', formData.link);
        data.append('heading', formData.heading);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            if (formData.image) {
                const imageResponse = await fetch('http://localhost:8080/upload/other', {
                    method: 'POST',
                    body: data,
                });
                const imageData = await imageResponse.json();
                data.set('image', imageData.imagePath);
            }

            const configResponse = await fetch('http://localhost:8080/configuration/homepage/section1', {
                method: 'POST',
                body: data,
            });

            if (configResponse.ok) {
                alert('Configuration updated successfully');
            } else {
                console.error('Error updating configuration:', await configResponse.text());
            }
        } catch (error) {
            console.error('Error updating configuration:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Card className={"w-[380px]"}>
                <CardHeader>
                    <CardTitle>Session 1</CardTitle>
                    <CardDescription>View preview below, remember to save after you edit</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label htmlFor={"description"}>Description:</Label>
                        <Textarea
                            id={"description"}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor={"buttonText"}>Button Text:</Label>
                        <Input
                            id={"buttonText"}
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor={"buttonLink"}>Button link:</Label>
                        <Input
                            id={"buttonLink"}
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor={"heading"}>Section 1 Heading:</Label>
                        <Input
                            id={"heading"}
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor={"image"}>Image:</Label>
                        <Input id={"image"}
                               type="file"
                               name="image"
                               onChange={handleFileChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Save</Button>
                </CardFooter>
            </Card>
        </form>

    );
};

export default EditSection1Config;