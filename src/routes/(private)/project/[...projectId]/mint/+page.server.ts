export const actions = {
    createMint: async ({request })=>{

        const formData = await request.formData()
        const imgFile = formData.get("imgInput")

        console.log(JSON.stringify(formData.get("nameInput")));
        console.log(imgFile);
        console.log(JSON.stringify(formData.get("descriptionInput")));
        console.log(formData.get("csvFile"));
        console.log(JSON.stringify(formData.get("publicKeys")));
        

    }
}

