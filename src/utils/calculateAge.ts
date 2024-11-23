function calculateAge(birthday: string, dateOfDeath: string | null = null) {
  const birthDate = new Date(birthday);

  if (dateOfDeath) {
    const deathDate = new Date(dateOfDeath);

    let ageAtDeath = deathDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = deathDate.getMonth() - birthDate.getMonth();
    const dayDifference = deathDate.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      ageAtDeath--;
    }

    return `${ageAtDeath}`;
  }

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return `${age}`;
}

export default calculateAge;
