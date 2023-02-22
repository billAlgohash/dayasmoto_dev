/*
 * @Author: yanhengfu 1315007322@qq.com
 * @Date: 2022-12-04 18:21:54
 * @LastEditors: yanhengfu 1315007322@qq.com
 * @LastEditTime: 2022-12-04 18:22:01
 * @FilePath: \part-time-lindacars\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function formatPrice(price) {
    return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}