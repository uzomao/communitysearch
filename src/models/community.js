import { supabase, SUCCESS_CODE, ERROR_CODE } from '../App'

const addToCommunity = async(currentUser, name) => {

    const { data: person, error } = await supabase
        .from('person')
        .select('*')
        .eq('name', name)

        const { id: profileId } = person[0]
        const community = currentUser.community

        if(!community.includes(profileId)){
            const { error } = await supabase
                .from('person')
                .update([
                    { community: [...community, profileId] },
                ])
                .eq('id', currentUser.id)
                if (error) console.log("error", error);
                else {
                    return {status: SUCCESS_CODE, message: `${name} has been added to your community :)`}
                }
        } else {
            return { status: ERROR_CODE, message: `${name} is already in your community`}
        }
        if(error) console.log("error", error)
}

export { addToCommunity }