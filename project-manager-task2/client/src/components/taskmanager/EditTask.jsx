import './addtask.scss';

const EditTask = () => {

    return (
        <div>
            <div className='addtask'>
                <form >
                    <input
                        type='text'
                        name='name'
                        placeholder='New UI Design'
                    />
                    <input
                        type='text'
                        name='desc'
                        placeholder='Designing a New UI for SaaS'
                    />
                    <input
                        type='date'
                        name='deadline'
                    />
                    <button className='button' type='submit'>Add Task</button>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
