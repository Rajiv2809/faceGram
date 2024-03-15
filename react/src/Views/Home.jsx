import React, { useEffect } from "react";
import { useStateContext } from "../Contexts/Context";
import axiosClient from "../Axios";

export default function Home() {
    const {currentUser, setCurrentUser} = useStateContext();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container">
          <a className="navbar-brand" href="homepage.html">
            Facegram
          </a>
          <div className="navbar-nav">
            <a className="nav-link" href="my-profile.html">
              {}
            </a>
            <a className="nav-link">Logout</a>
          </div>
        </div>
      </nav>
      {/* 
<main class="mt-5">
    <div class="container py-5">
        <div class="row justify-content-between">
            <div class="col-md-8">
                <h5 class="mb-3">News Feed</h5>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
                <div class="card mb-4">
                    <div class="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h6 class="mb-0">Lay Christian</h6>
                        <small class="text-muted">5 days ago</small>
                    </div>
                    <div class="card-body">
                        <div class="card-images mb-2">
                            <img src="posts/5898d0f58275e829008b4842.webp" alt="image" class="w-100"/>
                            <img src="posts/52a93d48-b9d4-4a7e-9fb7-c9466da4c344.webp" alt="image" class="w-100"/>
                            <img src="posts/shutterstock_1464930743-scaled.webp" alt="image" class="w-100"/>
                        </div>
                        <p class="mb-0 text-muted"><b><a href="user-profile.html">laychristian92</a></b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, minima?</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="request-follow mb-4">
                    <h6 class="mb-3">Follow Requests</h6>
                    <div class="request-follow-list">
                        <div class="card mb-2">
                            <div class="card-body d-flex align-items-center justify-content-between p-2">
                                <a href="user-profile-private.html">@laychristian92</a>
                                <a href="" class="btn btn-primary btn-sm">
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="explore-people">
                    <h6 class="mb-3">Explore People</h6>
                    <div class="explore-people-list">
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@davidnaista</a>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@superipey</a>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@lukicenturi</a>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@_erik3010</a>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@asawgi</a>
                            </div>
                        </div>
                        <div class="card mb-2">
                            <div class="card-body p-2">
                                <a href="user-profile-private.html">@irfnmaulaa</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main> */}
    </>
  );
}