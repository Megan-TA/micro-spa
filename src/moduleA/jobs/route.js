/*
 * @Author: chen_huang
 * @Date: 2020-02-29 14:31:18
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-02-29 19:24:16
 * @Description:
 */
import { route } from "../routes/index";

if (window.mp) {
  window.mp["moduleA_routes"] = () => route;
}
