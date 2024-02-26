export async function POST(req, res) {
    const data = await req.formData();
    if(data.get("file")){
        //upload the file
    }
}