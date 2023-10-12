import FormSubmitButton from "@/components/FormSubmitButton";
import {prisma} from "@/lib/db/prisma"
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
    title:"Add Product - Ecommerce"
}

async function AddProduct(formData: FormData){
    "use server"

    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }


    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name  || !description || !imageUrl || !price ){
        throw Error("Missing required fields");
    }


    await prisma.product.create({
        data: {name, description, imageUrl, price}
    })

    redirect("/");
}

const AddProductPage = async () => {

    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }

    return(
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={AddProduct}>
                <input
                    className="mb-3 w-full input input-bordered"
                    required
                    name="name"
                    placeholder="Product Name"
                />

                <textarea
                    required
                    name="description"
                    className="textarea textarea-bordered mb-3 w-full"
                    placeholder="Product Description"
                />
                <input
                    required
                    name="imageUrl"
                    className="mb-3 w-full input input-bordered"
                    placeholder="Image URL"
                />
                <input
                    required
                    name="price"
                    className="mb-3 w-full input input-bordered"
                    placeholder="Price"
                    type="number"
                />
               
                <FormSubmitButton className="btn-block" type="submit">ADD PRODUCT</FormSubmitButton>
            </form>
        </div>

        
    );
}


export default AddProductPage;