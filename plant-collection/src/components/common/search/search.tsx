import * as React from 'react';
import { Plant } from '../../../models/Plant';
import { useForm } from 'react-hook-form';
import './search.css'

export interface SearchProps {
    plants: Plant[],
    search: (searchResults: Plant[]) => void;
    onResults: (plants: Plant[]) => void
}

interface IFormInput {
    plantName: string;
}

export default function Search(props: SearchProps) {

    let { register, handleSubmit } = useForm<IFormInput>();

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<Plant[]>([]);
    const handleChange = (e: any) => {
        setSearchTerm(e.target.value)
    }
    let oldList = props.plants;

    React.useEffect(() => {
        if (searchTerm === '') {
            props.onResults(props.plants);
        }
        if (props.plants) {
            const results: Plant[] = oldList.filter(plant =>
                plant.plantName.toLowerCase().includes(searchTerm)
            );
            props.onResults(results);
        }
    }, [searchTerm]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search"
                name="plantName"
                ref={register({ required: true })}
                className="form-input"
                onChange={handleChange}
            />
        </div>



    );
}
