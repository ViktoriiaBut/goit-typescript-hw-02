export interface Image {
    id: string;
    alt_description: string;
    urls: {
        small: string;
        regular: string;
    };
}

export interface Response {
  total_pages: number;
  results: Image[];
};
