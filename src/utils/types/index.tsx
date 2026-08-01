import { z } from 'zod';

const loginSchema = z.object({
    username: z.email({ message: 'Aceasta trebuie să fie o adresă de e-mail validă.' }),
    password: z.string()
});

const userSchema = z.object({
    username: z.email(),
    email: z.email({ message: 'Adresă de e-mail nevalidă.' }),
    first_name: z.string().min(1, { message: 'Prenumele este obligatoriu.' }),
    last_name: z.string().min(1, { message: 'Numele de familie este obligatoriu.' }),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    zip: z.string().optional(),
});

const subscribeSchema = z.object({
    EMAIL: z.email({ message: 'Adresă de e-mail nevalidă.' }),
})

const contactSchema = z.object({
    fname: z.string().min(3, { message: 'Numele este obligatoriu.' }),
    email: z.email({ message: 'Adresă de e-mail nevalidă.' }),
    mesaj: z.string().min(10, { message: 'Doar atat?' }),
})

export { loginSchema, userSchema, subscribeSchema, contactSchema };

export type WP_POST = {
    id: number;
    date: string;
    date_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    content: { rendered: string; protected: boolean };
    excerpt: { rendered: string; protected: boolean };
    author: number;
    featured_media: number;
    comment_status: 'open' | 'closed';
    ping_status: 'open' | 'closed';
    categories?: number[];
    tags?: number[];
    [key: string]: any; // To allow for flexible fields/extensions
};

