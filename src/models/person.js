import { supabase } from '../App'

const getPerson = async (name) => {

    const { data: person, error } = await supabase
        .from('person')
        .select('*')
        .eq('name', name)
        if(error) console.log(error)
        else {
            return person[0]
        }

}

const searchForPersonName = async (searchTerm) => {

    const { data: person, error } = await supabase
        .from('person')
        .select('name')
        if(error) console.log(error)
        else {
            return person.filter(({ name }) => name.includes(searchTerm))
        }
}

export { 
    getPerson, 
    searchForPersonName 
}