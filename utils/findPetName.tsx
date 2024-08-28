
// 查找寵物名稱的函數
export function findPetNameById(petData: any, id: string): string | null {
    for (const stage in petData) {
        for (const pet of petData[stage]) {
            if (pet.id === id) {
            return pet.petname; // 返回找到的寵物名稱
            }
        }
    }
    return null; // 如果未找到則返回 null
}

// 查找寵物結局條件的函數
export function findPetRequirementById(petData: any, id: string): { [key: string]: number } | null {
    for (const stage in petData) {
        for (const pet of petData[stage]) {
            if (pet.id === id) {
                return pet.requirement; // 假設 `requirement` 是一個包含屬性的物件
            }
        }
    }
    return null; // 如果未找到則返回 null
}