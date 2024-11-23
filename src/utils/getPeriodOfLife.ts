function getShortPeriodOfLife(birthday: string, dateOfDeath: string) {
  const birthDate = new Date(birthday);
  const deathDate = new Date(dateOfDeath);

  return `${birthDate.getFullYear()}–${deathDate.getFullYear()}`;
}

export default getShortPeriodOfLife;
