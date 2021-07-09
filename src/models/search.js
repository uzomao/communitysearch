import { supabase } from "../App";

const postSearch = async (category, title, description, isSearchInCommunity, personId) => {
    const { data: search, error } = await supabase
        .from('searches')
        .insert([
            { 
                'category': category,
                'title': title,
                'description': description,
                'isFound': false,
                'isInCommunity': isSearchInCommunity,
                'personId': personId
            },
        ])
        if(error) console.log(error)
        else {
            return search[0]
        }
}

export { postSearch } 