

/**
 * Format ngày thành chuỗi có định dạng chuẩn theo locale.
 * @example formatDate("2025-11-05") -> "05/11/2025"
 */
export function formatDate(
  input: Date | string | number,
  locale: string = 'vi-VN',
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
): string {
  const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input
  if (isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Format ngày giờ chi tiết (có cả giờ/phút)
 * @example formatDateTime("2025-11-05T14:30:00Z") -> "05/11/2025, 21:30"
 */
export function formatDateTime(
  input: Date | string | number,
  locale: string = 'vi-VN',
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
): string {
  const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input
  if (isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Trả về dạng tương đối (ví dụ: "3 giờ trước", "2 ngày trước")
 * Dùng cho UI kiểu social feed
 */
export function timeAgo(input: Date | string | number): string {
  const date = typeof input === 'string' || typeof input === 'number' ? new Date(input) : input
  if (isNaN(date.getTime())) return ''

  const diffMs = Date.now() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 60) return 'Vừa xong'
  if (diffMin < 60) return `${diffMin} phút trước`
  if (diffHour < 24) return `${diffHour} giờ trước`
  if (diffDay < 7) return `${diffDay} ngày trước`

  return formatDate(date)
}

/**
 * Tính khoảng cách giữa hai ngày (theo ngày)
 */
export function daysBetween(a: Date | string, b: Date | string): number {
  const dateA = new Date(a)
  const dateB = new Date(b)
  const diff = Math.abs(dateB.getTime() - dateA.getTime())
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * Cộng thêm số ngày vào một ngày
 * @example addDays(new Date(), 7) -> ngày sau 7 ngày
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Kiểm tra 2 ngày có cùng ngày/tháng/năm không
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}


// console.log(formatDate('2025-11-05'))              // 05/11/2025
// console.log(formatDateTime(new Date()))            // 05/11/2025, 14:30
// console.log(timeAgo('2025-11-04T12:00:00Z'))      // "1 ngày trước"
// console.log(addDays(new Date(), 3))                // Date sau 3 ngày