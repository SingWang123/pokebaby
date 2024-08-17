
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