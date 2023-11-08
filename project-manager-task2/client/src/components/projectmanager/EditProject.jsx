import './addproject.scss';

const EditProject = () => {

    return (
        <div>
            <div className='addtask'>
                <form >
                    <input
                        type='text'
                        name='name'
                        placeholder='Add Project Name'
                    />
                    <input
                        type='text'
                        name='desc'
                        placeholder='Add Project Description'
                    />
                    <input
                        type='text'
                        name='department'
                        placeholder='Department'
                    />
                    <input
                        type='date'
                        name='startDate'
                    />
                    <input
                        type='date'
                        name='endDate'
                    />
                    <button className='button' type='submit'>Create Project</button>
                </form>
                <br />
                <br />
            </div>
        </div>
    );
};

export default EditProject;
