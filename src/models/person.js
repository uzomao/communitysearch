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

const getNameFromEmailAddress = async (email) => {

    const { data: person, error } = await supabase
        .from('person')
        .select('email, name')
        .eq('email', email)
        if(error) console.log(error)
        else {
            return person.length > 0 ? person[0].name : null
        }
}

export { 
    getPerson, 
    searchForPersonName ,
    getNameFromEmailAddress
}   