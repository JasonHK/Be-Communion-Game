"use strict";

import Phaser from "phaser";

export type MatterifyObject<GameObject extends Phaser.GameObjects.GameObject> = GameObject
                                                                              & Phaser.Physics.Matter.Components.Bounce
                                                                              & Phaser.Physics.Matter.Components.Collision
                                                                              & Phaser.Physics.Matter.Components.Force
                                                                              & Phaser.Physics.Matter.Components.Friction
                                                                              & Phaser.Physics.Matter.Components.Gravity
                                                                              & Phaser.Physics.Matter.Components.Mass
                                                                              & Phaser.Physics.Matter.Components.Sensor
                                                                              & Phaser.Physics.Matter.Components.SetBody
                                                                              & Phaser.Physics.Matter.Components.Sleep
                                                                              & Phaser.Physics.Matter.Components.Static
                                                                              & Phaser.Physics.Matter.Components.Transform
                                                                              & Phaser.Physics.Matter.Components.Velocity;
