import { countries } from 'data/countries'

export const relationshipOptions = [
  { value: '', label: 'Select a relation type' },
  { value: 'Spouse or Partner', label: 'Spouse or Partner' },
  { value: 'Parent/Guardian', label: 'Parent/Guardian' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Close Friend', label: 'Close Friend' },
  { value: 'Work Contact', label: 'Work Contact' },
  { value: 'Neighbor', label: 'Neighbor' },
  { value: 'Medical Power of Attorney', label: 'Medical Power of Attorney' },
  { value: 'Specialist or Physician', label: 'Specialist or Physician' },
]

export const heightFtOptions = []
for (let height = 4; height <= 7; height += 1) {
  heightFtOptions.push({ label: height.toString(), value: height.toString() });
}

export const heightInchOptions = []
for (let height = 0; height <= 11; height += 1) {
  heightInchOptions.push({ label: height.toString(), value: height.toString() });

}

export const weightOptions = []
for (let weight = 50; weight <= 400; weight += 5) {
  weightOptions.push({ label: weight.toString(), value: weight.toString() });
}

export const genderOptions = [
  { value: 'femake', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'undisclosed', label: 'Undisclosed' },
]

export const countryOptions = countries.map(country => ({
  label: `${country.name}`,
  value: country.code,
}))

countryOptions.sort((a, b) => {
  if (a.value === 'CA' || a.value === 'US') {
    return -1
  } else if (b.value === 'CA' || b.value === 'US') {
    return 1
  } else {
    return a.label.localeCompare(b.label)
  }
})
