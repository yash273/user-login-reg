import { ChartData } from "../interfaces/orgChart";

// export const cData: ChartData = {
//     name: 'John',
//     designation: 'CEO',
//     experience: 20,
//     tech: 'technology',
//     children: [
//         {
//             name: 'Michael',
//             designation: 'Manager 1',
//             experience: 20,
//             tech: 'technology',
//             children: [
//                 {
//                     name: 'Sarah',
//                     designation: 'Team Lead 1',
//                     experience: 20,
//                     tech: 'technology',
//                     children: [
//                         {
//                             name: 'Alex',
//                             designation: 'Developer 1',
//                             tech: 'technology',
//                             children: [
//                                 {
//                                     name: 'Emily',
//                                     designation: 'Developer 11',
//                                     tech: 'technology',
//                                     experience: 5
//                                 },
//                                 {
//                                     name: 'Jacob',
//                                     designation: 'Developer 12',
//                                     tech: 'technology',
//                                     experience: 3
//                                 }
//                             ]
//                         },
//                         {
//                             name: 'Emma',
//                             designation: 'Developer 2',
//                             tech: 'technology',
//                             children: [
//                                 {
//                                     name: 'Olivia',
//                                     designation: 'Developer 21',
//                                     tech: 'technology',
//                                     experience: 2
//                                 },
//                                 {
//                                     name: 'Ethan',
//                                     designation: 'Developer 22',
//                                     tech: 'technology',
//                                     experience: 4
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     name: 'Daniel',
//                     designation: 'Team Lead 2',
//                     tech: 'technology',
//                     experience: 10
//                 }
//             ]
//         },
//         {
//             name: 'Sophia',
//             designation: 'Manager 2',
//             tech: 'technology',
//             children: [
//                 {
//                     name: 'Ava',
//                     designation: 'Team Lead 3',
//                     tech: 'technology',
//                     experience: 8
//                 },
//                 {
//                     name: 'William',
//                     designation: 'Team Lead 4',
//                     tech: 'technology',
//                     experience: 6
//                 }
//             ]
//         }
//     ]
// };

// ectra
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

let idCounter = 1; // Initialize the ID counter

function assignUniqueIds(data: ChartData) {
    data.id = idCounter++; // Assign unique ID to the current node

    if (data.children) {
        data.children.forEach((child: ChartData) => {
            assignUniqueIds(child); // Recursively assign IDs to child nodes
        });
    }
}

// Call the function to assign unique IDs to chartData
assignUniqueIds(cData);




// export const cData: ChartData = {
//     name: 'John',
//     designation: 'CEO',
//     experience: 20,
//     tech: 'technology',
//     children: generateEmployees(3, 1)
// };

// function generateEmployees(count: number, level: number): ChartData[] {
//     const employees: ChartData[] = [];
//     for (let i = 1; i <= count; i++) {
//         const employee: ChartData = {
//             name: `Employee ${i}`,
//             designation: `Designation ${i}`,
//             experience: Math.floor(Math.random() * 20) + 1,
//             tech: `Technology ${i}`,
//             children: level < 3 ? generateEmployees(2, level + 1) : []
//         };
//         employees.push(employee);
//     }
//     return employees;
// }

// let idCounter = 1; // Initialize the ID counter

// function assignUniqueIds(data: ChartData) {
//     data.id = idCounter++; // Assign unique ID to the current node

//     if (data.children) {
//         data.children.forEach((child: ChartData) => {
//             assignUniqueIds(child); // Recursively assign IDs to child nodes
//         });
//     }
// }

// // Call the function to assign unique IDs to chartData
// assignUniqueIds(cData);