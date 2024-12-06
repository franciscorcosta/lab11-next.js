
interface products {
    id: number;
    title: String;
    price: number;
    description: String;
    category: String;
    image: String;
    rating: {
        rate: number;
        count: number;
    }

}