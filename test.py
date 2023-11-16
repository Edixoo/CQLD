import pandas as pd

# Define the structure of the program tracking file
program_structure = {
    'Day': ['1', '2', '3', '4', '5', '6', 'Rest'],
    'Focus': ['Powerlifting (Squat)', 'Bodybuilding', 'Powerlifting (Bench)', 'Bodybuilding', 'Powerlifting (Deadlift)', 'Bodybuilding', 'Rest'],
    'Exercises': [
        'Back Squats, Deadlifts, Accessory lifts for legs and lower back',
        'Target each major muscle group with 3-4 exercises',
        'Bench Press, Overhead Press, Accessory lifts for triceps and chest',
        'Target each major muscle group with 3-4 exercises',
        'Deadlifts, Front Squats, Accessory lifts for back and hamstrings',
        'Target each major muscle group with 3-4 exercises',
        'Rest/Active Recovery'
    ]
}

# Create the program DataFrame
program_df = pd.DataFrame(program_structure)

# Define the structure of the progress tracking file
progress_structure = {
    'Date': [],
    'Exercise': [],
    'Muscle Group': [],
    'Sets': [],
    'Reps': [],
    'Weight': [],
    'Notes': []
}

# Create the progress DataFrame
progress_df = pd.DataFrame(progress_structure)

# Define file paths
program_file_path = '/mnt/data/powerlifting_bodybuilding_program.csv'
progress_file_path = '/mnt/data/training_progress.csv'

# Save the files
program_df.to_csv(program_file_path, index=False)
progress_df.to_csv(progress_file_path, index=False)

# Return the file paths
program_file_path, progress_file_path
