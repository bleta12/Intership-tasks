const students = [
  { name: "Alice", grade: 85, subject: "Math" },
  { name: "Bob", grade: 92, subject: "Science" },
  { name: "Charlie", grade: 78, subject: "Math" },
  { name: "Diana", grade: 95, subject: "Science" },
  { name: "Eve", grade: 88, subject: "English" },
]

// Bug 1
const getPassingStudents = (students) => {
  students.filter((student) => student.grade >= 80)
  // funksioni nuk kthen asgje , mungon return type
  // correct version: return students.filter((student) => student.grade >= 80) 
}

// Bug 2
const getTotalGrades = (students) => {
  return students.reduce((student, total) => total + student.grade, 0)
  // totali i cili vepron si akumulator duhet te vendoset i pari
  //correct version: return students.reduce((total, student) => total + student.grade, 0)
}

// Bug 3
const addBonusPoints = (students, bonus) => {
  return students.map((student) => {
    student.grade += bonus
  })
  // per te mos lejuar ndryshimin ne arrayin origjinale, perdorim nje kopje
  // correct version: return students.map(student => ({ ...student, grade: student.grade + bonus }))
}

// Bug 4
const getStudentNames = (students) => {
  return students.forEach((student) => student.name)
  //forEach vetem iteron, nuk kthen nje array ose rezultatin , per kete arsye perdorim map
  // correct version : return students.map((student) => student.name)
}

// Bug 5
const formatStudentData = (students) => {
  return students.map((student) => {
    const formatted = {
      fullName: student.name.toUpperCase(),
      percentage: student.grade + "%",
      passed: student.grade >= 80,
    } // krijojme formatted por nuk e kthejm asnjehere brenda map-it(nuk i krijojme objektet(undefind) brenda arrays)
    // correct version : return formatted;
  })
}

// Bug 6
const GradeCalculator = {
  passingGrade: 80,

  checkIfPassing: (grade) => { // po deklarohet si array function(this nuk i referohet vete objektit dhe pastaj eshte undefind),
    //  duhet te jete nje metod e cila perdor this(referohet vete objektit)
    return grade >= this.passingGrade
  },
  // correct version :  checkIfPassing(grade) { 
  // return grade >= this.passingGrade }

  filterPassingStudents: function (students) {
    return students.filter((student) => this.checkIfPassing(student.grade))
  },
  // filterPassingStudents(students) {
  //  return students.filter((student) => this.checkIfPassing(student.grade)) }
}

// Bug 7
const sortStudentsByGrade = (students) => {
  return students.sort((a, b) => b.grade - a.grade)
  // duhet te kopjohet arraya first qe te mos ndryshohet origjinali(sort is in place-function)
  // correct version: return [...students].sort((a, b) => b.grade - a.grade)

}

// Bug 8
const hasHighGradeStudent = (students) => {
  return students.filter((student) => student.grade > 90)
  // kthen array te studentave me note me te madhe se 90, nese deshirojm boolean perdorim some
  //return students.some((student) => student.grade > 90)

}

// Bug 9
const getGoodStudents = (students) => {
  return students.map((student) => {
    if (student.grade >= 85) {
      return student
    }
  })
  // map kthen te gjithe arrain edhe nese ka vlera undefind(ato te cilat nuk perputhen me rezultatin)
  // prandaj perdorim filter per te kthyer vetem ato te cilat e plotesojne kushtin 
  // return students.filter((student) => student.grade >= 85)

}
