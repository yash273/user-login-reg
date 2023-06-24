import { ChartData } from "../interfaces/orgChart";

export const cData: ChartData = {
    name: 'John',
    designation: 'CEO',
    experience: 20,
    tech: 'technology',
    children: [
        {
            name: 'Michael',
            designation: 'Manager 1',
            experience: 20,
            tech: 'technology',
            children: [
                {
                    name: 'Sarah',
                    designation: 'Team Lead 1',
                    experience: 20,
                    tech: 'technology',
                    children: [
                        {
                            name: 'Alex',
                            designation: 'Developer 1',
                            tech: 'technology',
                            children: [
                                {
                                    name: 'Emily',
                                    designation: 'Developer 11',
                                    tech: 'technology',
                                    experience: 5
                                },
                                {
                                    name: 'Jacob',
                                    designation: 'Developer 12',
                                    tech: 'technology',
                                    experience: 3
                                }
                            ]
                        },
                        {
                            name: 'Emma',
                            designation: 'Developer 2',
                            tech: 'technology',
                            children: [
                                {
                                    name: 'Olivia',
                                    designation: 'Developer 21',
                                    tech: 'technology',
                                    experience: 2,
                                    children: [
                                        {
                                            name: 'Ava',
                                            designation: 'Team Lead 3',
                                            tech: 'technology',
                                            experience: 8
                                        },
                                        {
                                            name: 'William',
                                            designation: 'Team Lead 4',
                                            tech: 'technology',
                                            experience: 6
                                        },
                                        {
                                            name: 'Ava',
                                            designation: 'Team Lead 3',
                                            tech: 'technology',
                                            experience: 8,
                                        }
                                    ]
                                },
                                {
                                    name: 'Ethan',
                                    designation: 'Developer 22',
                                    tech: 'technology',
                                    experience: 4
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'Daniel',
                    designation: 'Team Lead 2',
                    tech: 'technology',
                    experience: 10
                }
            ]
        },
        {
            name: 'Sophia',
            designation: 'Manager 2',
            tech: 'technology',
            children: [
                {
                    name: 'Ava',
                    designation: 'Team Lead 3',
                    tech: 'technology',
                    experience: 8
                },
                {
                    name: 'William',
                    designation: 'Team Lead 4',
                    tech: 'technology',
                    experience: 6
                },
                {
                    name: 'Ava',
                    designation: 'Team Lead 3',
                    tech: 'technology',
                    experience: 8,
                    children: [
                        {
                            name: 'Ava',
                            designation: 'Team Lead 3',
                            tech: 'technology',
                            experience: 8
                        },
                        {
                            name: 'William',
                            designation: 'Team Lead 4',
                            tech: 'technology',
                            experience: 6
                        },
                        {
                            name: 'Ava',
                            designation: 'Team Lead 3',
                            tech: 'technology',
                            experience: 8,

                        },
                        {
                            name: 'William',
                            designation: 'Team Lead 4',
                            tech: 'technology',
                            experience: 6
                        }
                    ]

                },
                {
                    name: 'William',
                    designation: 'Team Lead 4',
                    tech: 'technology',
                    experience: 6
                }
            ]
        }
    ]
};

// assigning unique id
let idCounter = 1;
function assignUniqueIds(data: ChartData) {
    data.id = idCounter++; 
    if (data.children) {
        data.children.forEach((child: ChartData) => {
            assignUniqueIds(child);
        });
    }
}
assignUniqueIds(cData);